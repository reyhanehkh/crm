import { AuthContextProps } from "../components/auth-context";
import { getData, postData, putData } from "./core";

export default class FileApi {
  static uri = "file";
  context: AuthContextProps;
  constructor(context: AuthContextProps) {
    this.context = context;
  }
  get(id: number) {
    return getData({ uri: FileApi.uri, id, context: this.context });
  }

  getAll() {
    return getData({ uri: FileApi.uri, context: this.context });
  }

  post(
    type: string,
    phone: string,
    subCenterId: string,
    agentCode: string,
    ownershipType: string,
    installAddress: string
  ) {
    return postData({
      uri: FileApi.uri,
      data: {
        type,
        phone,
        subCenterId,
        agentCode,
        fullfillInfo: {
          ownershipType,
          installAddress,
        },
      },
      context: this.context,
    });
  }

  terminateCurrentService(id: number) {
    return putData({
      uri: `${FileApi.uri}/TerminateCurentService`,
      id,
      context: this.context,
    });
  }

  ChangeComment(id: number, comment: string) {
    return putData({
      uri: `${FileApi.uri}/ChangeFileComment`,
      id,
      params: `?comment=${comment}`,
      context: this.context,
    });
  }
}
