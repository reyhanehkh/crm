import { AuthContextProps } from "../components/auth-context";
import { postFile } from "./core";

export default class UploadApi {
  static uri = "upload";
  context: AuthContextProps;
  constructor(context: AuthContextProps) {
    this.context = context;
  }

  post(file: File) {
    var formData = new FormData();
    formData.append("File", file);
    return postFile({
      uri: UploadApi.uri,
      context: this.context,
      data: formData,
    });
  }
}
