export interface FunctionArgument {
  name: string
  type: string
  required: boolean
  description: string
}
export interface FunctionData {
  name: string
  args: FunctionArgument[]
  description: string
  usage: string
  functionBody: string
  func: (...args: any) => any
}

export default class FunctionParser {
  private static parseComments(funcString: string): Partial<FunctionData> | undefined {
    const comments = funcString.match(/\/\*\*[\s\S]*?\*\//g)
    if (!comments) return
    const comment = comments[0]
    const description = comment.match(/@description: (.*)/)?.[1] || ""
    const args = comment
      .match(/@param (.*)/g)
      ?.map((arg) => {
        const name = arg.match(/@param (.*)/)?.[1] || ""
        const type = arg.match(/type {(.*)}/)?.[1] || ""
        const required = arg.match(/required (.*)/)?.[1] === "true"
        const description = arg.match(/description (.*)/)?.[1] || ""
        return { name, type, required, description }
      })
      .filter(Boolean) as FunctionArgument[]
    const usage = comment.match(/@usage\n(.*)/)?.[1] || ""
    return { description, args, usage }
  }

  public static parseFunction(func: (...args: any[]) => any): FunctionData {
    const funcString = func.toString()
    const funcName = funcString.substring(9, funcString.indexOf("(")).trim()
    const funcBody = funcString
      .substring(funcString.indexOf("{") + 1, funcString.lastIndexOf("}"))
      .trim()
    const { description, args, usage } = (FunctionParser.parseComments(funcString) || {
      description: "",
      args: [],
      usage: "",
    }) as FunctionData
    return { name: funcName, args, description, usage, functionBody: funcBody, func }
  }
}
