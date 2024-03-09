import React from "react";
import Form from "./ Form";

function FormTestPage() {
  const template = {
    title: "TestForm",
    fields: [
      {
        type: "text",
        placeholder: "Fullname",
        name: "fullname",
      },
      {
        type: "text",
        placeholder: "Username",
        name: "username",
      },
    ],
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return <Form template={template} onSubmit={onSubmit} />;
}

export default FormTestPage;
