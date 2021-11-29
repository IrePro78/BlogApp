from .models import Article
from .permissions import IsAuthor
from .serializers import ArticleSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import viewsets


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-created_at')
    lookup_field = "slug"
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthor, IsAuthenticatedOrReadOnly]

    #
    # def get_queryset(self):
    #     author = self.request.query_params.get('author')
    #     print(author)
    #     return Article.objects.filter(author=self.request.user) if author == "me" else super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
