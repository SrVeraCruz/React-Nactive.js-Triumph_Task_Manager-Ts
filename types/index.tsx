export type TaskType = {
  id: number,
  title: string,
  description: string,
  status: 'Not Done' | 'Pending' | 'Done'
}

export type DashboardItemType = {
  id: number,
  name: string,
  icon: any,
  url: string,
  color: string
}