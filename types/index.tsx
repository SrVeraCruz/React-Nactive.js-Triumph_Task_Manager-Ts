export type TaskType = {
  id: number,
  title: string,
  description: string,
  status: 'Non fait' | 'En cours' | 'Fait'
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
  agentMethode: any,
  tasks: TaskType[],
}