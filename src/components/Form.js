import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const DynamicForm = ({ fields }) => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape(
    fields.reduce((schema, field) => {
      let fieldSchema = Yup.string();

      if (field.required) {
        fieldSchema = fieldSchema.required(`${field.label} is required`);
      }

      if (field.type === "password") {
        // No regex validation for password field
      } else if (field.type === "radio") {
        fieldSchema = fieldSchema.oneOf(
          field.options.map((option) => option.value),
          `${field.label} is required`
        );
      } else if (field.type === "checkbox" && field.name === "colors") {
        fieldSchema = fieldSchema.test(
          `${field.label} is required`,
          `${field.label} is required`,
          (value) => {
            return value && value.length > 0;
          }
        );
      } else if (field.regex) {
        fieldSchema = fieldSchema.matches(new RegExp(field.regex), {
          message: `${field.label} is not valid`,
          excludeEmptyString: true,
        });
      }

      schema[field.name] = fieldSchema;

      return schema;
    }, {})
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={fields.reduce((acc, field) => {
          acc[field.name] = field.type === "checkbox" ? [] : "";
          return acc;
        }, {})}
        validationSchema={validationSchema}
        validateOnChange={true}
      >
        {({ isSubmitting, touched, errors, values, resetForm }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              let allFieldsFilled = true;
              Object.keys(values).forEach((key) => {
                if (
                  fields.find((field) => field.name === key).required &&
                  !values[key]
                ) {
                  allFieldsFilled = false;
                }
              });
              if (allFieldsFilled) {
                console.log(JSON.stringify(values, null, 2));
                alert("Form submitted successfully!");
                resetForm(); // Reset form values
              } else {
                alert("Please fill in all required fields.");
              }
            }}
            className="max-w-md w-full space-y-4"
          >
            {fields.map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                {field.type !== "password" && field.type !== "radio" && (
                  <>
                    {field.type === "checkbox" && field.name === "colors" && (
                      <>
                        {field.options.map((option, index) => (
                          <div key={index}>
                            <Field
                              type="checkbox"
                              name={field.name}
                              value={option.value}
                            />
                            <label>{option.label}</label>
                          </div>
                        ))}
                        {touched[field.name] &&
                          values[field.name].length === 0 && (
                            <div className="text-red-600">
                              Choose at least one color
                            </div>
                          )}
                      </>
                    )}
                    {field.type === "select" && (
                      <>
                        <Field
                          as="select"
                          name={field.name}
                          multiple={field.multipleSelect}
                          className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 ${
                            touched[field.name] && errors[field.name]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="" disabled hidden>
                            Select {field.label}
                          </option>
                          {field.options.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name={field.name}
                          component="div"
                          className="text-red-600"
                        />
                      </>
                    )}
                    {field.type === "text" && (
                      <Field
                        type="text"
                        name={field.name}
                        placeholder={`Enter ${field.label}`}
                        className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 ${
                          touched[field.name] && errors[field.name]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    )}
                    {field.type === "file" && (
                      <>
                        <Field
                          type="file"
                          name={field.name}
                          placeholder={`Select ${field.label}`}
                          className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 ${
                            touched[field.name] && errors[field.name]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <ErrorMessage
                          name={field.name}
                          component="div"
                          className="text-red-600"
                        />
                      </>
                    )}
                  </>
                )}
                {field.type === "password" && (
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name={field.name}
                      placeholder={`Enter ${field.label}`}
                      className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 ${
                        touched[field.name] && errors[field.name]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 py-2"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </button>
                    <div className="text-gray-500 mt-1">
                      {touched[field.name] && errors[field.name] && (
                        <div className="text-red-600">
                          Password is incorrect
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {field.type === "radio" && (
                  <>
                    {field.options.map((option, index) => (
                      <div key={index}>
                        <Field
                          type="radio"
                          name={field.name}
                          value={option.value}
                        />
                        <label>{option.label}</label>
                      </div>
                    ))}
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-600"
                    />
                  </>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicForm;
