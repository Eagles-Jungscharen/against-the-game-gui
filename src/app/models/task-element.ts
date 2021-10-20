export class TaskElement {
  id!: string;
  no!: number;
  name!: string;
  started!: boolean;
  done!: boolean;
  endTime!: Date;
  static create(taskNo: number, name: string) {
    const te = new TaskElement();
    te.id = '@new';
    te.no = taskNo;
    te.name = name.trim();
    return te;
  }
}
