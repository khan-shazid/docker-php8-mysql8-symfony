<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Company;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/api', name: 'api_')]
class CompanyController extends AbstractController
{
    private $client;
    public function __construct(
        HttpClientInterface $client
    ) {
        $this->client = $client;
    }
    #[Route('/companies', name: 'app_company', methods: ['get'])]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $response = $this->client->request(
            'GET',
            'http://host.docker.internal:4000/company/parse/301674916'
        );

        $statusCode = $response->getStatusCode();
        // $statusCode = 200
        $contentType = $response->getHeaders()['content-type'][0];
        // $contentType = 'application/json'
        $content = $response->getContent();
        // $content = '{"id":521583, "name":"symfony-docs", ...}'
        $content = $response->toArray();
        // $content = ['id' => 521583, 'name' => 'symfony-docs', ...]

        // return $content;
        // return $this->json(['message' => 'this is me!']);
        $companies = $doctrine
            ->getRepository(Company::class)
            ->findAll();
        $data = [];

        foreach ($companies as $company) {
            $data[] = [
                'id' => $company->getId(),
                'name' => $company->getName(),
                'content' => $content
            ];
        }
        return $this->json($data);
    }

    #[Route('/companies', name: 'company_create', methods: ['post'])]
    public function create(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $entityManager = $doctrine->getManager();

        $company = new Company();
        $company->setName($request->request->get('name'));
        $company->setCode($request->request->get('code'));

        $entityManager->persist($company);
        $entityManager->flush();

        $data = [
            'id' => $company->getId(),
            'name' => $company->getName(),
            'code' => $company->getCode(),
        ];

        return $this->json($data);
    }


    #[Route('/companies/{id}', name: 'company_update', methods: ['put', 'patch'])]
    public function update(ManagerRegistry $doctrine, Request $request, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $company = $entityManager->getRepository(Company::class)->find($id);

        if (!$company) {
            return $this->json('No company found for id' . $id, 404);
        }

        $company->setName($request->request->get('name'));
        // $company->setDescription($request->request->get('description'));
        $entityManager->flush();

        $data = [
            'id' => $company->getId(),
            'name' => $company->getName(),
            // 'description' => $company->getDescription(),
        ];

        return $this->json($data);
    }
}