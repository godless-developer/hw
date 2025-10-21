import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OpProps = {
  option1: string;
  option2: string;
  option3?: string;
  option4?: string;
  option5?: string;
};

export function SelectDemo({
  label,
  options,
}: {
  label?: string;
  options: OpProps;
}) {
  return (
    <div className="flex flex-col gap-4">
      {label && (
        <label className=" text-gray-800 font-medium text-[15px]">
          {label}
        </label>
      )}
      <Select>
        <SelectTrigger className="w-full px-4 py-2.5 bg-white/90 rounded-xl text-gray-800 shadow-sm transition-all focus:shadow-sm duration-200 ease-in-out hover:bg-white hover:shadow-md caret-gray-500 focus:outline-none cursor-pointer border focus:ring-0 focus:border ">
          <SelectValue placeholder="Сонгох..." />
        </SelectTrigger>

        <SelectContent
          className="
            bg-white/95
            backdrop-blur-md 
            shadow-lg 
            border border-gray-200 
            rounded-xl 
            transition-all duration-200
          "
        >
          <SelectGroup className="text-gray-700">
            {options.option1 && (
              <SelectItem
                value={options.option1}
                className="hover:bg-blue-900 focus:bg-blue-300 cursor-pointer rounded-[11px] transition-all duration-150"
              >
                {options.option1}
              </SelectItem>
            )}
            {options.option2 && (
              <SelectItem
                value={options.option2}
                className="hover:bg-blue-500 focus:bg-blue-300 cursor-pointer rounded-[11px] transition-all duration-150"
              >
                {options.option2}
              </SelectItem>
            )}
            {options.option3 && (
              <SelectItem
                value={options.option3}
                className="hover:bg-blue-500 focus:bg-blue-300 cursor-pointer rounded-[11px] transition-all duration-150"
              >
                {options.option3}
              </SelectItem>
            )}
            {options.option4 && (
              <SelectItem
                value={options.option4}
                className="hover:bg-blue-500 focus:bg-blue-300 cursor-pointer rounded-[11px] transition-all duration-150"
              >
                {options.option4}
              </SelectItem>
            )}
            {options.option5 && (
              <SelectItem
                value={options.option5}
                className="hover:bg-blue-500 focus:bg-blue-300 cursor-pointer rounded-[11px] transition-all duration-150"
              >
                {options.option5}
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
