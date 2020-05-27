# Canvas HTML : animations TypeScript

Ce projet est un terrain de jeu pour réaliser des programmes de rendu sur le Canvas HTML. La structure du projet permet de mettre en place rapidement de nouveaux petits programmes d'animations afin de tester des concepts ou encore pour visualiser des problématiques.

Mon but initial était simplement de découvrir TypeScript , ce pourquoi j'avais besoin d'objectifs de conception concrets : le Canvas offrait tous les loisirs à ces découvertes.



## Pourquoi TypeScript ?

Je me suis intéressé à TypeScript afin d'actualiser mes compétences Javascript et adopter des bonnes pratiques. En premier se posent des questions. Qu'est ce que c'est TypeScript ? Encore une technologie qui va passer de mode ?  Est-ce que j'en ai besoin ? Pourquoi dépenser de l'énergie à l'apprendre ? Et puis au fur et à mesure de l'expérience, toutes ces questions trouvent des réponses et le retour d'expérience final est excellent.

TypeScript est une extension à Javascript qui ajoute l'indication de type au langage.

C'est tout, où presque. Et déjà beaucoup. Par le simple fait d'indiquer le type des variables, des paramètres de fonction et des retours de fonction, l'éditeur de texte peut exploiter ces informations pour analyser le code et prévenir les erreurs ou compléter plus efficacement la frappe. 

Le gain en qualité et en productivité est si important que le temps investi à l'apprentissage est tout de suite rentabilisé. Se pose alors l'ultime question : pourquoi je n'ai pas basculé plus tôt !?



Techniquement les fichiers TypeScript sont compilés en Javascript, cela explique pourquoi l'on peut utiliser TypeScript là où l'on utilisait Javascript.


Installer son environnement de travail et compiler TypeScript est très simple. Un fichier `tsconfig.json` permet de configurer les options de compilations qui seront exploitées par l'IDE lors de la sauvegarde du fichier pour générer de manière transparente les fichiers Javascript. Les méthodes de travail restent exactement les mêmes qu'auparavant !



## But initial : un cadre de réalisation d'applications à partir du Canvas

Pour la mise en pratique de TypeScript je me suis mis comme objectif de faire suffisamment de conception pour mémoriser par la pratique et obtenir des automatismes. Cela explique la sur-conception autour du canevas pour des exemples qui au final n'auraient pas besoin d'une telle complexité. Le résultat à le mérite d'être assez générique pour réaliser rapidement d'autres programmes de visualisation que je mettrai à disposition au fil de l'eau.

Le cadre général utilise donc l'élément Canvas à la manière des couches de calques superposables comme sous les logiciels de retouche photo ou de conception vectorielle. Chaque couche peut posséder une liste de programmes qui vont effectuer le rendu visuel de la couche, c'est au niveau de ces programmes de rendu qu'est effectué l'appel à la logique de représentation sur le calque.

Les rendus peuvent être répétés afin de créer des animations, ou bien rester simplement statiques.



## Les programmes de rendu.

Sous cette section je préciserai uniquement l'objet des programmes de rendu les plus captivants.





### Système multi-agents : banc de poissons

Cet exemple est tiré du livre [*L'Intelligence Artificielle pour les développeurs Concepts et implémentations en C#*](https://www.editions-eni.fr/livre/l-intelligence-artificielle-pour-les-developpeurs-concepts-et-implementations-en-c-2e-edition-9782409011405), par Virginie MATHIVET, ouvrage paru aux éditions ENI. Ce livre présente de nombreux projets très intéressants, celui ci illustre l'emploi de système multi-agents pour modéliser un comportement dans un environnement, ici il s'agit de simuler le déplacement d'un banc de poissons dans un océan virtuel à partir de quelques règles simples.

L'application est une implémentation TypeScript assez fidèle du code C#. *(Pour utiliser des déplacements par une librairie de manipulation de vecteurs voir l'ex. bouncing-ball.ts)*



![image-20200527125352293](\resources\images\image-20200527125352293.png)


Au début du programme, 150 agents - les poissons - sont positionnés aléatoirement dans un océan virtuel. Ils se déplacent à vitesse constante chacun dans une direction elle aussi aléatoire.



![image-20200527125211393](\resources\images\image-20200527125211393.png)



Les poissons vont rapidement se regrouper grâce à un comportement d'alignement sur les autres poissons et ils vont ainsi former des bancs qui évoluent au gré des obstacles positionnés par un clic souris.