export type TaskStatusValues = 'Non fait' | 'En cours' | 'Fait'
export type FilterValues = 'Tous' | 'Ligne' | 'Opératrice' | 'Agent'

export type TaskType = {
  id: number,
  title: string,
  comment: string,
  video?: string,
  ligneCouture: string,
  numeroOperatrice: string,
  agentMethode: string,
  status: TaskStatusValues,
  createdAt: string,
  updatedAt?: string,
  finishedAt?: string,
}

export type DashboardItemType = {
  id: number,
  name: string,
  icon: any,
  url: string,
  color: string
}

export type SuiviDesActionType = {
  id: number,
  ligneCouture: string,
  numeroOperatrice: string,
  agentMethode: string,
  tasks: TaskType[],
  createdAt: string
}