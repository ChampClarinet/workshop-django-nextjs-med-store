from rest_framework import serializers
from DjangoMedicalApp.models import CompanyBank
from .company import CompanySerializer

class CompanyBankSerializer(serializers.ModelSerializer):
    class Meta:
        model=CompanyBank
        fields="__all__"

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['company']=CompanySerializer(instance.company_id).data
        return response