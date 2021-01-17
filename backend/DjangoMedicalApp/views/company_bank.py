from rest_framework import viewsets, status
from DjangoMedicalApp.models import CompanyBank
from DjangoMedicalApp.serializers import CompanyBankSerializer
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class CompanyBankViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        companybank=CompanyBank.objects.all()
        serializer=CompanyBankSerializer(companybank, many=True, context={"request": request})
        response_dict={
            "error": False,
            "message": "All company bank list data",
            "data": serializer.data
        }
        return Response(response_dict)

    def create(self, request):
        try:
            serializer=CompanyBankSerializer(data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response={
                "error": False,
                "message": "Company Bank data created",
            }
        except Exception as e:
            print('Company bank create', e)
            dict_response={
                "error": True,
                "message": "Company Bank data creation error",
            }
        return Response(dict_response, status=status.HTTP_201_CREATED)
    
    def retrieve(self, request, pk=None):
        queryset=CompanyBank.objects.all()
        companybank=get_object_or_404(queryset, pk=pk)
        serializer=CompanyBankSerializer(companybank, context={"request": request})
        return Response({
            "error": False,
            "message": "Single company bank data fetched",
            "data": serializer.data,
        })

    def update(self, request, pk=None):
        try:
            queryset=CompanyBank.objects.all()
            companybank=get_object_or_404(queryset, pk=pk)
            serializer=CompanyBankSerializer(companybank, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response={
                "error": False,
                "message": "Company bank data updated",
            }
        except Exception as e:
            print('Company bank update', e)
            dict_response={
                "error": True,
                "message": "Company bank data updation error",
            }
        return Response(dict_response)

# company_list=CompanyViewSet.as_view({"get": "list"})
# company_create=CompanyViewSet.as_view({"post": "list"})
# company_update=CompanyViewSet.as_view({"put": "update"})