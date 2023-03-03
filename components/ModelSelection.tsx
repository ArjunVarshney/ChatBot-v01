import { ReactElement } from "react";
import Select from "react-select";
import useSWR from "swr";

const fetchModels = () =>
  fetch("/api/getEngines").then((res) => {
    return res.json();
  });

const ModelSelection = (): ReactElement => {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  return (
    <div>
      <Select
        className="mt-2"
        options={models?.modelOptions}
        placeholder={model}
        defaultValue={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
};

export default ModelSelection;
