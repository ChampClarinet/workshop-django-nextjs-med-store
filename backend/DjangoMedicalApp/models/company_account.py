from django.db import models
from .company import Company

class CompanyAccount(models.Model):
    choices=((1, "Debit"), (2, "Credit"))
    id=models.AutoField(primary_key=True)
    company_id=models.ForeignKey(Company, on_delete=models.CASCADE)
    transaction_type=models.CharField(choices=choices, max_length=255)
    transaction_amt=models.CharField(max_length=255)
    transaction_date=models.DateField()
    payment_mode=models.CharField(max_length=255)
    added_on=models.DateTimeField(auto_now_add=True)
    objects=models.Manager()