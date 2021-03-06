import { TasksService } from './../services/tasksService/tasks.service';
import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { CircleColorPipe } from './../pipes/circleColorPipe/circle-color.pipe';
import { ItemDetailsComponent } from './../item-details/item-details.component';
import { ActionItemsComponent } from './../action-items/action-items.component';
import { AppMaterialModule } from './../app-material/app-material.module';
import { Project, ProjectsService } from './../services/projects/projects.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddOrUpdateActionItemComponent } from './add-item.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

const dialogMock = {
  close: () => {}
};

describe('AddItemComponent', () => {
  let component: AddOrUpdateActionItemComponent;
  let fixture: ComponentFixture<AddOrUpdateActionItemComponent>;
  let projectsService: ProjectsService;
  let tasksService: TasksService;
  let nameField;
  let projectField;
  let dueDateField;
  let descriptionField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddOrUpdateActionItemComponent,
        ActionItemsComponent,
        ItemDetailsComponent,
        CircleColorPipe,
        DaysLeftCountedPipe
      ],
      imports: [AppMaterialModule, RouterTestingModule, RoundProgressModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    projectsService = TestBed.get(ProjectsService);
    tasksService = TestBed.get(TasksService);
    fixture = TestBed.createComponent(AddOrUpdateActionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nameField = component.dialogForm.controls.title;
    projectField = component.dialogForm.controls.projectName;
    dueDateField = component.dialogForm.controls.dueDate;
    descriptionField = component.dialogForm.controls.description;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.dialogForm.valid).toBeFalsy();
  });

  it('name field invalid when empty', () => {
    expect(nameField.valid).toBeFalsy();
  });

  it('name should be required', () => {
    let errors = {};
    errors = nameField.errors || {};
    nameField.setValue('');
    expect(nameField.hasError('required')).toBeTruthy();
  });

  it('projectName field invalid when empty', () => {
    expect(projectField.valid).toBeFalsy();
  });

  it('projectName should be required', () => {
    let errors = {};
    errors = projectField.errors || {};
    projectField.setValue('');
    expect(projectField.hasError('required')).toBeTruthy();
  });

  it('dueDate field valid when empty', () => {
    expect(dueDateField.valid).toBeTruthy();
  });

  it('description field valid when empty', () => {
    expect(descriptionField.valid).toBeTruthy();
  });

  it('form valid when nameField and projectField filled', () => {
    nameField.setValue('test');
    projectField.setValue('test');
    expect(component.dialogForm.valid).toBeTruthy();
  });

  it('button disabled when nameField and projectField empty', () => {
    const createButton = fixture.debugElement.query(By.css('.create'));
    fixture.detectChanges();
    expect(createButton.nativeElement.disabled).toBeTruthy();
  });

  it('button active when nameField and projectField filled', () => {
    const createButton = fixture.debugElement.query(By.css('.create'));
    nameField.setValue('test');
    projectField.setValue('test');
    fixture.detectChanges();
    expect(createButton.nativeElement.disabled).toBeFalsy();
  });

  it('should disable form when an item is being created', () => {
    expect(component.dialogForm.valid).toBeFalsy();
    nameField.setValue('test name');
    projectField.setValue('test project');
    expect(component.dialogForm.valid).toBeTruthy();
    component.createActionItem();
    expect(nameField.enabled).toBe(false);
    expect(projectField.enabled).toBe(false);
    expect(dueDateField.enabled).toBe(false);
    expect(descriptionField.enabled).toBe(false);
  });

  it('should display the spinner on the create-button when item is being created', () => {
    component.isSavingDialogData = false;
    component.saveForm();
    fixture.detectChanges();
    expect(component.isSavingDialogData).toBe(true);
  });

  it('should retrieve the projects names from projectsService', () => {
    const projectsNames: Project[] = [{ name: 'CASD Wilson & Lamberton Middle Schools' }];
    spyOn(projectsService, 'getProjectsNames').and.returnValue(of(projectsNames));
    component.ngOnInit();
    expect(component.projects).toEqual(projectsNames);
  });

  it('button active when nameField and projectField filled', () => {
    const createButton = fixture.debugElement.query(By.css('.create'));
    nameField.setValue('test');
    projectField.setValue('test');
    fixture.detectChanges();
    expect(createButton.nativeElement.disabled).toBeFalsy();
  });

  it('should close the dialog when item created', fakeAsync(() => {
    const spyObj = spyOn(component.dialogRef, 'close');
    component.createActionItem();
    tick(1000);
    fixture.detectChanges();
    expect(spyObj).toHaveBeenCalled();
  }));

  it('should not show any error message if no item was selected', () => {
    const nameError = fixture.debugElement.query(By.css('.nameError'));
    const projectError = fixture.debugElement.query(By.css('.projectError'));
    expect(nameError).toBeFalsy();
    expect(projectError).toBeFalsy();
  });

  it('should call editActionItem() in the component', () => {
    component.dialogMode = 'Edit';
    const editActionItemComponentSpy = spyOn(component, 'editActionItem');
    component.saveForm();
    fixture.detectChanges();
    expect(editActionItemComponentSpy).toHaveBeenCalled();
  });

  it('should call editActionItem() in the Tasks Service', () => {
    const editActionItemServiceSpy = spyOn(tasksService, 'editActionItem').and.callThrough();
    component.editActionItem();
    fixture.detectChanges();
    expect(editActionItemServiceSpy).toHaveBeenCalled();
  });

  it('should set the dialog mode to "Edit"', () => {
    component.data.dialogMode = 'Edit';
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.dialogMode).toEqual('Edit');
  });

  it('should set the dialog mode to "Create"', () => {
    component.data.dialogMode = 'Create';
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.dialogMode).toEqual('Create');
  });
});
