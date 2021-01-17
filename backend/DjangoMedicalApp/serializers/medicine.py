from rest_framework import serializers
from DjangoMedicalApp.models import Medicine
from .company import CompanySerializer

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model=Medicine
        fields="__all__"

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['company']=CompanySerializer(instance.company_id).data
        return response