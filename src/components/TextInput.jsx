import React from "react";
import { useField } from "formik";
import { Input } from "antd";

export default function TextInput({
  fieldName,
  label,
  type,
  classes = "",
  ...props
}) {
  const [field] = useField(props);

  return (
    <div>
      {!props.mask && (
        <Input
          type={type}
          className={classes + " input-text"}
          {...field}
          {...props}
          placeholder={label}
        />
      )}
    </div>
  );
}
