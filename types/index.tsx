export type TaskStatusValues = 'Non fait' | 'En cours' | 'Fait'
export type FilterValues = 'Tous' | 'Ligne' | 'Operatrice' | 'Agent'

export type TaskType = {
  id: number,
  title: string,
  comment: string,
  video?: string,
  ligneCouture: string,
  numeroCuturiere: string,
  agentMethode: string,
  status: TaskStatusValues,
  createdAt: string
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
  numeroCuturiere: string,
  agentMethode: string,
  tasks: TaskType[],
  createdAt: string
}