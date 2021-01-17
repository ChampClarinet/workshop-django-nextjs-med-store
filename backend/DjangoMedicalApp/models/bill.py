from django.db import models
from .customer import Customer

class Bill(models.Model):
    id=models.AutoField(primary_key=True)
    customer_id=models.ForeignKey(Customer, on_delete=models.CASCADE)
    added_on=models.DateTimeField(auto_now_add=True)
    objects=models.Manager()