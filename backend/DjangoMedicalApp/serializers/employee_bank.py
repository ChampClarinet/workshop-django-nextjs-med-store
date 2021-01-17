from rest_framework import serializers
from DjangoMedicalApp.models import EmployeeBank
from .employee import EmployeeSerializer

class EmployeeBankSerializer(serializers.ModelSerializer):
    class Meta:
        model=EmployeeBank
        fields="__all__"

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['employee']=MedicineSerializer(instance.employee_id).data
        return response