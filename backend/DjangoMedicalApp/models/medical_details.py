from django.db import models
from .medicine import Medicine

class MedicalDetails(models.Model):
    id=models.AutoField(primary_key=True)
    medical_id=models.ForeignKey(Medicine, on_delete=models.CASCADE)
    salt_name=models.CharField(max_length=255)
    salt_qty=models.CharField(max_length=255)
    salt_qty_type=models.CharField(max_length=255)
    description=models.CharField(max_length=255)
    added_on=models.DateTimeField(auto_now_add=True)
    objects=models.Manager()