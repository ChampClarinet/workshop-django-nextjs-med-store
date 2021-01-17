from rest_framework import serializers
from DjangoMedicalApp.models import MedicalDetails
from .medicine import MedicineSerializer

class MedicalDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=MedicalDetails
        fields="__all__"

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['medicine']=MedicineSerializer(instance.medical_id).data
        return response

class MedicalDetailsSerializerSimple(serializers.ModelSerializer):
    class Meta:
        model=MedicalDetails
        fields="__all__"