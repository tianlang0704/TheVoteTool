/**
 * Created by CMonk on 3/22/2017.
 */

/*ErrorMatcher*/
export class EM {
  public static CNSim = "SimplifiedChinese"

  public static listIdNotFound = "ListIDNotFound";
  public static invalidParameters = "InvalidParameters";

  public static listMustNotBeEmpty = "ListMustNotBeEmpty";

  public static match(error: string, lan: string) : string{
    if(lan == this.CNSim) {
      switch (error) {
        case this.listIdNotFound: return "投票序号未找到";
        case this.listMustNotBeEmpty: return "列表序号不能为空";
        default: return "未知错误";
      }
    }else{
      return error;
    }
  }
}
