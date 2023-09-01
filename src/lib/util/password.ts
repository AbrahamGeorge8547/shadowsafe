export default function passwordStrength(password: string) {
  if (typeof password !== "string") {
    throw new Error("Expected a string as password.");
  }
  const lengthCriteria = password.length >= 8;
  const numberCriteria = /[0-9]/.test(password);
  const lowercaseCriteria = /[a-z]/.test(password);
  const uppercaseCriteria = /[A-Z]/.test(password);
  const specialCharCriteria = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password
  );
  const passedCriteria = [
    lengthCriteria,
    numberCriteria,
    lowercaseCriteria,
    uppercaseCriteria,
    specialCharCriteria,
  ].filter(Boolean).length;

  switch (passedCriteria) {
    case 0:
    case 1:
      return "very risky";
    case 2:
      return "risky";
    case 3:
      return "avg";
    case 4:
      return "medium";
    case 5:
      return "strong";
    default:
      return "unknown";
  }
}
