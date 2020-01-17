import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

export interface ActionItem {
  title: string;
  projectName: string;
  type?: string;
  completed?: string;
  dueDate?: Date;
  id: string;
}

export interface AddActionItem {
  title: string;
  projectName: string;
  type?: string;
  completed?: string;
  dueDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly dataTable: ActionItem[] = [
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: '1'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/12/29'),
      id: '2'
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0',
      dueDate: new Date('2019/11/15'),
      id: '3'
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: '4'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/11/16'),
      id: '5'
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: '6'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/11/16'),
      id: '7'
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0',
      dueDate: new Date('2020/01/05'),
      id: '8'
    }
  ];
  add(item: AddActionItem): Observable<ActionItem> {
    return new Observable(observer => {
      setTimeout(() => {
        const newActionItem = {
          ...item,
          id: this.itemId()
        };
        this.dataTable.push(newActionItem);
        observer.next(newActionItem);
      }, 1000);
    });
  }
  getAllItems(): Observable<ActionItem[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.dataTable);
      }, 1000);
    });
  }
  getActionItem(itemId: string | undefined): Observable<ActionItem> {
    const actionItem = this.dataTable.find(({ id }) => id === itemId);
    return new Observable(observer => {
      setTimeout(() => {
        if (actionItem) {
          observer.next(actionItem);
        } else {
          observer.error(new HttpResponse({ status: 404, statusText: 'No item with such ID found!' }));
        }
      }, 2000);
    });
  }
  deleteActionItem(itemId: string): void {
    setTimeout(() => {
      this.dataTable.filter(item => {
        if (item.id === itemId) {
          this.dataTable.splice(this.dataTable.indexOf(item), 1);
        }
      }, 1000);
    });
  }
  editActionItem(
    itemId: string,
    itemTitle: string,
    itemProjectName: string,
    itemDueDate: Date
  ): Observable<ActionItem> {
    let editedItem;
    setTimeout(() => {
      this.dataTable.filter(item => {
        if (item.id === itemId) {
          item.title = itemTitle;
          item.projectName = itemProjectName;
          item.dueDate = itemDueDate;
          editedItem = item;
        }
      });
    }, 1000);
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(editedItem);
      }, 1000);
    });
  }
  itemId(): string {
    return (
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36)
    );
  }
}
