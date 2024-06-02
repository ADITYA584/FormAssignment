const fields = [
  {
    name: "username",
    type: "text",
    required: true,
    regex: /^[a-zA-Z\s]*$/,
    label: "Name",
  },
  {
    name: "password",
    type: "password",
    required: true,
    regex:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*])[a-zA-Zd!@#$%^&*]{8,}$",
    regexMessage: [
      "Password must contain at least 8 characters",
      "At least one uppercase letter is required",
      "At least one lowercase letter is required",
      "At least one number is required",
      "At least one special character is required",
    ],
    label: "password",
  },
  {
    name: "email",
    type: "text",
    required: true,
    regex: "^\\S+@\\S+\\.\\S+$",
    label: "Email",
  },
  {
    name: "gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    required: true,
    label: "Gender",
  },
  {
    name: "colors",
    type: "checkbox",
    options: [
      { label: "Red", value: "red" },
      { label: "Green", value: "green" },
      { label: "Blue", value: "blue" },
    ],
    label: "Colour",
  },
  {
    name: "country",
    type: "select",
    options: [
      { label: "USA", value: "usa" },
      { label: "Canada", value: "canada" },
      { label: "UK", value: "uk" },
    ],
    required: true,
    label: "Country",
  },
  {
    name: "file",
    type: "file",
    required: true,
    fileFormatSupported: ["jpg", "jpeg", "png"],
    label: "File",
  },
];

export default fields;
