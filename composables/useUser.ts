// import { User } from "firebase/auth";

export const useUser = () => useState<string | null>("user", () => "jon");
