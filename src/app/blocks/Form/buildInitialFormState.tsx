import type { FormFieldBlock } from "@payloadcms/plugin-form-builder/types";

export const buildInitialFormState = (fields: FormFieldBlock[]) => {
  return fields?.reduce((initialSchema, field) => {
    switch (field.blockType) {
      case "checkbox":
        return {
          ...initialSchema,
          [field.name]: false,
        };
      case "country":
        return {
          ...initialSchema,
          [field.name]: "",
        };
      case "email":
        return {
          ...initialSchema,
          [field.name]: "",
        };
      case "text":
        return {
          ...initialSchema,
          [field.name]: "",
        };
      case "select":
        return {
          ...initialSchema,
          [field.name]: "",
        };
      case "state":
        return {
          ...initialSchema,
          [field.name]: "",
        };
      default:
        return initialSchema;
    }
  }, {});
};
