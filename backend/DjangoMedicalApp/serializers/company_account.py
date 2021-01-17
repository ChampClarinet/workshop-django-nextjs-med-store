from rest_framework import serializers
from DjangoMedicalApp.models import CompanyAccount
from .company import CompanySerializer

class CompanyAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=CompanyAccount
        fields="__all__"

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['company']=CompanySerializer(instance.company_id).data
        return response