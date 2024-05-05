"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import Input from "@/components/Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const { debouncedValue } = useDebounce<string>(value, 500);

  const handleChange = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

  return (
    <Input
      placeholder={"What do you want to listen to ?"}
      value={value}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
