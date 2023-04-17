import { useLocalStorageState } from "ahooks";

const [manager, setManager] =
  useLocalStorageState("manager");

export default {
  manager,
  setManager,
};
