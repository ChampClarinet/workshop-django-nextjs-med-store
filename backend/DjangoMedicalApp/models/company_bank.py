from django.db import models
from .company import Company

class CompanyBank(models.Model):
    id=models.AutoField(primary_key=True)
    bank_account_no=models.CharField(max_length=255)
    ifsc_no=models.CharField(max_length=255)
    company_id=models.ForeignKey(Company, on_delete=models.CASCADE)
    added_on=models.DateTimeField(auto_now_add=True)