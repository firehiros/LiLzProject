export const MESSAGES = {
  MSG_REQUIRED: (name: string) => `${name} is mandatory`,
  MSG_INVALID_FORMAT: (name: string) => `${name} is invalid format`,
  MSG_ENTITY_CREATED: (name: string) => `${name} has been created.`,
  MSG_ENTITY_UPDATED: (name: string) => `${name} has been updated.`,
  MSG_ENTITY_DELETED: (name: string) => `${name} has been deleted.`,
  MSG_NOT_EXIST: (name: string) => `${name} does not exist.`,
  MSG_NOT_FOUND: (name: string) => `${name} does not found.`,
  MGS_UNKNOW_ERROR: (code: string) =>
    `An unknow error occurred, error code: ${code}`,
};
