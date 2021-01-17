from django.db import models
from .bill import Bill
from .medicine import Medicine

class BillDetails(models.Model):
    id=models.AutoField(primary_key=True)
    bill_id=models.ForeignKey(Bill, on_delete=models.CASCADE)
    medicine_id=models.ForeignKey(Medicine, on_delete=models.CASCADE)
    qty=models.IntegerField()
    added_on=models.DateTimeField(auto_now_add=True)
    objects=models.Manager()