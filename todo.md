# TODO

## checkbox shlagedex list

- si on reclic ne pas décocher
- cursor pointer
- au tout prémier sdhlagémon débloqué, on ne peut pas changer de shlagémons ensuite sans relancr l'app
- au click droit : ouvre le détial du shlagémon

- test ->file

```
pnpm vitest run --reporter=json > vitest-report.json
```

test ->extract

```
 $json = Get-Content -Raw -Path "vitest-report.json" | ConvertFrom-Json

 # Créer un dossier pour les fichiers filtrés
 $targetFolder = "vitest-failed-only"
 New-Item -ItemType Directory -Force -Path $targetFolder | Out-Null

 # Index pour nommer les fichiers
 $index = 1

 foreach ($testSuite in $json.testResults) {
     # Filtrer les tests échoués
     $failedAssertions = @($testSuite.assertionResults | Where-Object { $_.status -eq "failed" })

     # Ne rien faire s'il n'y a pas de tests échoués
     if ($failedAssertions.Count -eq 0) {
         continue
     }

     # Créer un objet contenant seulement les infos utiles
     $filteredSuite = [PSCustomObject]@{
         name = $testSuite.name
         status = "failed"
         assertionResults = $failedAssertions
     }

     # Sauvegarder dans un fichier
     $filename = "failed-test-{0:D3}.json" -f $index
     $filepath = Join-Path $targetFolder $filename
     $filteredSuite | ConvertTo-Json -Depth 100 | Out-File -Encoding utf8 -FilePath $filepath

     $index++
 }
```
