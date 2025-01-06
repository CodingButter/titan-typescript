declare module "assert-js" {
  export default class Assert {
    static true(value: any): void
    static false(value: any): void

    static instanceOf(value: any, constructor: Function): void
    static instanceOneOf(value: any, constructors: Function[]): void

    static containsOnly(array: any[], type: Function): void
    static containsOnlyString(array: any[]): void
    static containsOnlyInteger(array: any[]): void
    static containsOnlyNumber(array: any[]): void

    static integer(value: any): void
    static number(value: any): void
    static oddNumber(value: any): void
    static evenNumber(value: any): void

    static greaterThan(value: any, comparison: any): void
    static greaterThanOrEqual(value: any, comparison: any): void
    static lessThan(value: any, comparison: any): void
    static lessThanOrEqual(value: any, comparison: any): void

    static string(value: any): void
    static boolean(value: any): void

    static equal(value: any, comparison: any): void
    static objectEqual(value: any, comparison: any): void

    static object(value: any): void

    static hasFunction(functionName: string, obj: Record<string, any>): void
    static hasProperty(propertyName: string, obj: Record<string, any>): void
    static isFunction(value: any): void

    static array(value: any): void

    static count(expectedCount: number, array: any[]): void
    static notEmpty(value: any, array: any[]): void

    static jsonString(value: string): void
    static email(value: string): void
    static url(value: string): void
    static uuid(value: string): void

    static hasElement(selector: string, document: Document): void
    static hasAttribute(attribute: string, element: Element | null): void
    static hasAttributes(attributes: string[], element: Element | null): void

    static throws(fn: () => void, error: Error): void
  }
}
