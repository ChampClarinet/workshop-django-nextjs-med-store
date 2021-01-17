from django.db import models
from .employee import Employee

class EmployeeBank(models.Model):
    id=models.AutoField(primary_key=True)
    bank_account_no=models.CharField(max_length=255)
    ifsc_no=models.CharField(max_length=255)
    employee_id=models.ForeignKey(Employee, on_delete=models.CASCADE)
    added_on=models.DateTimeField(auto_now_add=True)
    objects=models.Manager()
