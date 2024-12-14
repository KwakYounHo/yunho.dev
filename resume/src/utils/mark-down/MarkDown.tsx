"use client";

import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { Controller, FieldValues, Path, type Control } from "react-hook-form";

// Editor -----------------------------------------------------------------

export interface EditorProps<T extends FieldValues> extends MDEditorProps {
  initValue?: string;
  name: Path<T>;
  control: Control<T>;
}

export const Editor = <T extends FieldValues>({
  initValue,
  control,
  name,
  ...rest
}: EditorProps<T>) => {
  // theme
  const { theme } = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if (initValue) field.onChange(initValue);
        return (
          <div data-color-mode={theme || "system"}>
            <MDEditor value={field.value} onChange={field.onChange} {...rest} />
          </div>
        );
      }}
    />
  );
};

// Editor -----------------------------------------------------------------
