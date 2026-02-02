export { BaseRepository } from "./BaseRepository";
export type { IProjectRepository, ProjectCreateData } from "./IProjectRepository";
export { ProjectRepository } from "./ProjectRepository";
// FileProjectRepository NO se exporta aquí porque usa Node.js fs/promises
// y solo debe usarse en el servidor (API routes). Impórtalo directamente desde su archivo.
