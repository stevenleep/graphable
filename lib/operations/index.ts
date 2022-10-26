import { OperationEqualModel, EQUAL_OPERATION } from "./EqualOperation";
import { OperationGreatelModel, GREATER_OPERATION } from "./GreaterOperation";
import {
  OperationGreatelEqualModel,
  GREATER_EQUAL_OPERATION,
} from "./GreaterEqualOption";
import { OperationLessModel, LESS_OPERATION } from "./LessOperation";
import {
  OperationLessEqualModel,
  LESS_EQUAL_OPERATION,
} from "./LessEqualOperation";
import { OperationIncludeModel, INCLUDE_OPERATION } from "./IncludeOperation";
import {
  OperationExincludeModel,
  EXINCLUDE_OPERATION,
} from "./ExincludeOperation";

export default {
  [EQUAL_OPERATION]: OperationEqualModel,
  [GREATER_OPERATION]: OperationGreatelModel,
  [GREATER_EQUAL_OPERATION]: OperationGreatelEqualModel,
  [LESS_OPERATION]: OperationLessModel,
  [LESS_EQUAL_OPERATION]: OperationLessEqualModel,
  [INCLUDE_OPERATION]: OperationIncludeModel,
  [EXINCLUDE_OPERATION]: OperationExincludeModel,
};
