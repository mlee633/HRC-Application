import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_curve, auc, confusion_matrix

# -------------------------------
# Step 1. Load the dataset
# -------------------------------
df = pd.read_excel("Patient_Data_with_Hospitalised.xlsx") 

# -------------------------------
# Step 2. Categorise by rule-based thresholds
# -------------------------------
def categorize_mci(mci):
    if pd.isna(mci):
        return "Unknown"
    if mci <= 5:
        return "Low"
    elif 6 <= mci <= 10:
        return "Moderate"
    else:
        return "High"

df["MCI_Category"] = df["Overall MRCI"].apply(categorize_mci)

# Hospitalisation rates by group
group_rates = df.groupby("MCI_Category")["Hospitalised"].mean()
print("\nHospitalisation rates by MCI category:")
print(group_rates)

# -------------------------------
# Step 3. Logistic Regression
# -------------------------------
df_model = df.dropna(subset=["Overall MRCI", "Hospitalised"])
X = df_model[["Overall MRCI"]].values
y = df_model["Hospitalised"].values

log_reg = LogisticRegression()
log_reg.fit(X, y)

# Predict probabilities
y_scores = log_reg.predict_proba(X)[:, 1]

# ROC curve + AUC
fpr, tpr, thresholds = roc_curve(y, y_scores)
roc_auc = auc(fpr, tpr)

# Optimal probability cutoff (Youden’s J)
j_scores = tpr - fpr
j_ordered = sorted(zip(j_scores, thresholds, fpr, tpr))
optimal_j, optimal_threshold, opt_fpr, opt_tpr = j_ordered[-1]

# -------------------------------
# Step 4. Translate cutoff back to MCI score
# -------------------------------
alpha = log_reg.intercept_[0]
beta = log_reg.coef_[0][0]
p = optimal_threshold
optimal_mci_cutoff = (np.log(p / (1 - p)) - alpha) / beta

# -------------------------------
# Step 5. Print Results
# -------------------------------
print("\n=== MCI Logistic Regression Analysis ===")
print(f"ROC AUC (predictive ability): {roc_auc:.2f}")
print(f"Optimal probability cutoff (Youden's J): {optimal_threshold:.2f}")
print(f"Optimal MCI cutoff from model: {optimal_mci_cutoff:.1f}")
print("Current rule-based cutoff for High risk: >= 10")

if optimal_mci_cutoff < 10:
    print(f"\nInterpretation:\n- The model suggests flagging High risk earlier, "
          f"at MCI >= {optimal_mci_cutoff:.1f}, instead of the current >= 10.")
else:
    print(f"\nInterpretation:\n- The model suggests keeping the cutoff near the "
          f"current value (MCI >= {optimal_mci_cutoff:.1f}).")

# -------------------------------
# Step 6. Compare Cutoffs
# -------------------------------
def evaluate_cutoff(mci_cutoff, X, y):
    """Evaluate sensitivity/specificity at a given MCI cutoff."""
    preds = (X >= mci_cutoff).astype(int)  # 1 = high risk
    tn, fp, fn, tp = confusion_matrix(y, preds).ravel()
    sensitivity = tp / (tp + fn) if (tp + fn) > 0 else 0
    specificity = tn / (tn + fp) if (tn + fp) > 0 else 0
    return sensitivity, specificity, tp, fp, tn, fn

# Evaluate current rule (>=10) and model cutoff
sens_rule, spec_rule, tp_r, fp_r, tn_r, fn_r = evaluate_cutoff(10, X, y)
sens_model, spec_model, tp_m, fp_m, tn_m, fn_m = evaluate_cutoff(round(optimal_mci_cutoff), X, y)

print("\n=== Cutoff Comparison ===")
print(f"Rule-based cutoff (>=10): Sensitivity = {sens_rule:.2f}, Specificity = {spec_rule:.2f}")
print(f"Model-suggested cutoff (>= {round(optimal_mci_cutoff)}): Sensitivity = {sens_model:.2f}, Specificity = {spec_model:.2f}")

print("\nConfusion Matrices:")
print(f"Cutoff >=10  -> TP:{tp_r}, FP:{fp_r}, TN:{tn_r}, FN:{fn_r}")
print(f"Cutoff >={round(optimal_mci_cutoff)} -> TP:{tp_m}, FP:{fp_m}, TN:{tn_m}, FN:{fn_m}")

# -------------------------------
# Step 7. Plots
# -------------------------------
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# Bar plot hospitalisation rates
(group_rates * 100).plot(kind="bar", ax=axes[0], color=["green", "orange", "red"])
axes[0].set_title("Hospitalisation Rate by MCI Category")
axes[0].set_ylabel("Hospitalisation Rate (%)")
axes[0].set_ylim(0, 100)
for i, v in enumerate(group_rates * 100):
    axes[0].text(i, v + 2, f"{v:.1f}%", ha="center", fontweight="bold")

# ROC curve
axes[1].plot(fpr, tpr, label=f"AUC = {roc_auc:.2f}")
axes[1].plot([0, 1], [0, 1], "k--")
axes[1].scatter(opt_fpr, opt_tpr, color="red", s=80, label="Optimal Cutoff")
axes[1].set_xlabel("False Positive Rate")
axes[1].set_ylabel("True Positive Rate")
axes[1].set_title(f"ROC Curve for MCI → Hospitalisation\nOptimal cutoff ≈ MCI ≥ {optimal_mci_cutoff:.1f}")
axes[1].legend(loc="lower right")

# -------------------------------
# Step 8. Confusion Matrix Plots
# -------------------------------
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Confusion matrices
cm_rule = np.array([[tn_r, fp_r],
                    [fn_r, tp_r]])
cm_model = np.array([[tn_m, fp_m],
                     [fn_m, tp_m]])

# Rule-based cutoff
sns.heatmap(cm_rule, annot=True, fmt="d", cmap="Blues", cbar=False, ax=axes[0])
axes[0].set_title("Confusion Matrix (Cutoff ≥10)")
axes[0].set_xlabel("Predicted")
axes[0].set_ylabel("Actual")
axes[0].set_xticklabels(["Low Risk", "High Risk"])
axes[0].set_yticklabels(["Low Risk", "High Risk"])
axes[0].text(0.5, -0.3,
             f"Sensitivity = {sens_rule:.2f}, Specificity = {spec_rule:.2f}",
             ha="center", va="center", transform=axes[0].transAxes, fontsize=10, fontweight="bold")

# Model-suggested cutoff
sns.heatmap(cm_model, annot=True, fmt="d", cmap="Greens", cbar=False, ax=axes[1])
axes[1].set_title(f"Confusion Matrix (Cutoff ≥{round(optimal_mci_cutoff)})")
axes[1].set_xlabel("Predicted")
axes[1].set_ylabel("Actual")
axes[1].set_xticklabels(["Low Risk", "High Risk"])
axes[1].set_yticklabels(["Low Risk", "High Risk"])
axes[1].text(0.5, -0.3,
             f"Sensitivity = {sens_model:.2f}, Specificity = {spec_model:.2f}",
             ha="center", va="center", transform=axes[1].transAxes, fontsize=10, fontweight="bold")

plt.tight_layout()
plt.show()
