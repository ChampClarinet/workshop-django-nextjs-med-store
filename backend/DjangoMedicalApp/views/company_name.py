from rest_framework import generics
from DjangoMedicalApp.models import Company
from DjangoMedicalApp.serializers import CompanySerializer

class CompanyNameViewSet(generics.ListAPIView):
    serializer_class=CompanySerializer

    def get_queryset(self):
        name=self.kwargs["name"]
        return Company.objects.filter(name=name)