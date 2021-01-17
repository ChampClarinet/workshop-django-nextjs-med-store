from rest_framework import serializers
from DjangoMedicalApp.models import Company

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=Company
        # fields=['id', 'name', 'license_no', 'address', 'contact_no', 'email', 'description', 'added_on']
        fields="__all__" #? This line equivalent to above line