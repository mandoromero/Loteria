
import React from "react";
import "../History/History.css";

export default function History() {
    return(
        <div id="rules-history">
            <h2 className="history-title">Rules and History</h2>
            <p><span lang="es">La Loteria</span> is a bingo-style game with colorful images instead of letters and numbers</p>
            <p>This game, that started of as a past time for the social elite in Mexico, quickly spread through out the country making it one of the most popular and recognized games in Mexico.</p>    
            <table>
                <h3>Table of Contents</h3>
                <ul>
                    <li><a href="#how-to-play">How to play</a></li>
                    <li><a href="#history">History</a></li>
                    <li><a href="#card-name-and-phrases">Card name and phrases</a></li>
                </ul>
            </table>

            <section id="how-to-play">
                <h3>How To Play</h3>
                <p>While different people have differen ways to play and win the game, these are the basics:</p>
                <ul>
                    <li>At least 2 players</li>
                    <li>The specical pack of 54 Loteria cards</li>
                    <li>The playing board for each player called <span lang="es">la tabla</span></li>
                    <li>Someone to call out the cards as they are played called <span lang="es">a cantor</span></li>
                </ul>
                <p>The players can choose up to four <span lang="es">tablas</span>. You would have to specify how much the player pays for each one. Can be any amout starting at .01 cents and up.</p>
                <p>You then have to specify the winning combinations. Row, Column,  diagonal, the X shape or two diagonals crossing, the four outer corners, the four inner or center, and of course the full game board. You can exclude or add other combinations of your choice. Depending on how much money is in the pot, you set a winning value for each winning combination. For example you could say that the first person to make each one of the winning combinations wins .10 cents and who ever fills their card first,  wins what ever is left in the pot.  There are many possible ways to declare winners and the amounts to win. Be creative and have fun with it.</p>
                <p>You could even have the players take turn on being the <span lang="es">cantor</span></p>
            </section>

            <section id="history">
                <h3>History of La Loteria</h3>
                <p>The origin of <span lang="es">La Loteria</span> can be traced back to have been originated in Italy in the 15th century and was brought to New Spain (modern Mexico) around 1769 where is was mostly a hobby of the upper class, but it eventually became a tradition at Mexican fairs.  Don Clemente Jacques, a french businessman who established the first food processing factory in Mexico, began publishing the game in 1887.  His version of the game was distrubuted to Mexican soldiers along with rations and supplies.</p>
                <p>The images Don Clemente used in his card designs have become iconic in Mexican culture. Many of the images used resemble Tarot card, but some have also had a part in representing different aspects of Mexico's national identity during the 19th century.</p>
            </section>
            <section id="card-name-and-phrases">
                <h3>Card Names and Phrases</h3>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Egnlish</th>
                            <th>Phrase</th>
                            <th>Translation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><span lang="es">El gallo</span></td>
                            <td>The rooster</td>
                            <td><span lang="es">El que le canto a Ssan Pedro no le volvera a cantar</span></td>
                            <td>The one that sang for st. Peter will never sing for him again</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><span lang="es">El diablito</span></td>
                            <td>The little devil</td>
                            <td><span lang="es">Portate bien cuatito, si no te lleva el coloradito</span></td>
                            <td>Behave yourself buddy, or the little red one will take you away</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><span lang="es">La dama</span></td>
                            <td>The lady</td>
                            <td><span lang="es">Puliendo el paso, por toda la calle real</span></td>
                            <td>Impoving her gait, all along the main street</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td><span lang="es">El Catrin</span></td>
                            <td>The dandy</td>
                            <td><span lang="es">Don Ferruco en la alameda, su baston queria tirar</span></td>
                            <td>Sir Ferruco in the popular grove, wanted to toss his cane.</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td><span lang="es">El Paraguas</span></td>
                            <td>The umbrella</td>
                            <td><span lang="es">Para el sol y para el agua</span></td>
                            <td>For the sun and for the rain</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td><span lang="es">La sirena</span></td>
                            <td>The Mermaid</td>
                            <td><span lang="es">Con los cantos de sirena, no te vayas a marear</span></td>
                            <td>Don't be swayed by the songs of the siren.</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td><span lang="es">La escalera</span></td>
                            <td></td>
                            <td><span lang="es">Subeme pasa a pasito, no quieras pegar brinquitos.</span></td>
                            <td>Ascend me step by step, don't try and skip.</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>La botella<span lang="es"></span></td>
                            <td></td>
                            <td><span lang="es">La herrramienta del borracho.</span></td>
                            <td>The tool of the drunk.</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td><span lang="es">El barril</span></td>
                            <td>The barrel</td>
                            <td><span lang="es">Tanto bebio el albanil, que quedo como barril.</span></td>
                            <td>So much did the bricklayer drink, he ended up like a barrel.</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td><span lang="es">El arbol</span></td>
                            <td>The tree</td>
                            <td><span lang="es">El que a buen arbol se arrima, buena sombra le cobija</span></td>
                            <td>He who nears a good tree, is blanketed by good shade.</td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td><span lang="es">El melon</span></td>
                            <td>The melon</td>
                            <td><span lang="es">Me lo das o me lo quitas.</span></td>
                            <td>Give it to me or take it from me.</td>
                        </tr>
                        <tr>
                            <td>12</td>
                            <td><span lang="es">El valiente</span></td>
                            <td>The brave man</td>
                            <td><span lang="es">Por que corres cobarde, trayendo tan buen punal</span></td>
                            <td>Why do you run coward? Having such a good blade too.</td>
                        </tr>
                        <tr>
                            <td>13</td>
                            <td><span lang="es">El gorrito</span></td>
                            <td>The little bonnet</td>
                            <td><span lang="es">Ponle su gorrito al nene, no se nos vaya a resfriar.</span></td>
                            <td>Put the bonnet on the baby, lest he catch a cold.</td>
                        </tr>
                        <tr>
                            <td>14</td>
                            <td><span lang="es">La Muerte</span></td>
                            <td>Death</td>
                            <td><span lang="es">La meuerte tilica y flaca</span></td>
                            <td>Death, thin and lanky</td>
                        </tr>
                        <tr>
                            <td>15</td>
                            <td><span lang="es">La pera</span></td>
                            <td>The pear</td>
                            <td><span lang="es">El que espara desespera.</span></td>
                            <td>He who waits dispairs.(A pun: <span lang="es">espera</span> "waits" and <span lang="es">es pera</span> "is a pear" are homophones in Mexican Spanish.)</td>
                        </tr>
                        <tr>
                            <td>16</td>
                            <td><span lang="es">La bandera</span></td>
                            <td>The flag</td>
                            <td><span lang="es">Verde blanaco y colorado, la bandera del soldado.</span></td>
                            <td>Green, white and red, the flag of the soldier.</td>
                        </tr>
                        <tr>
                            <td>17</td>
                            <td><span lang="es">El Bandolon</span></td>
                            <td>The mandolin</td>
                            <td><span lang="es">Tocando su bandolon esta el mariachi Simon</span></td>
                            <td>There playing his lute, is Simon the mariachi.</td>
                        </tr>
                        <tr>
                            <td>18</td>
                            <td><span lang="es">El violoncello</span></td>
                            <td>The cello</td>
                            <td><span lang="es">Creciendo se fue hasta el cielo y como no fue violin, tovo que ser violocello.</span></td>
                            <td>Growing it reached the heavens, and since it wasn't a violin, it had to be a cello</td>
                        </tr>
                        <tr>
                            <td>19</td>
                            <td><span lang="es">La garza</span></td>
                            <td>The heron</td>
                            <td><span lang="es">Al otro lado del rio tengo mi banco de arena, donde se sienta mi chata pico de garza morena.</span></td>
                            <td>At the other side of the river I have my sand bank, where sits my darliing short one, with the beak of a great blue heron.</td>
                        </tr>
                        <tr>
                            <td>20</td>
                            <td><span lang="es">El Pajaro</span></td>
                            <td>The bird</td>
                            <td><span lang="es">Tu me traies a puros brincos, como pajaro en la rama.</span></td>
                            <td>You have me hoping here and there like a bird on a branch.</td>
                        </tr>
                        <tr>
                            <td>21</td>
                            <td><span lang="es">La mano</span></td>
                            <td>The hand</td>
                            <td><span lang="es">La mano de un criminal.</span></td>
                            <td>The hand of a criminal.</td>
                        </tr>
                        <tr>
                            <td>22</td>
                            <td><span lang="es">La bota</span></td>
                            <td>The boot</td>
                            <td><span lang="es">Una botaiga igual que la otra.</span></td>
                            <td>A boot the same as the other.</td>
                        </tr>
                        <tr>
                            <td>23</td>
                            <td><span lang="es">La luna</span></td>
                            <td>The moon</td>
                            <td><span lang="es">El farol de los enamorados.</span></td>
                            <td>The street lamp of  lovers.</td>
                        </tr>
                        <tr>
                            <td>24</td>
                            <td><span lang="es">El cotorro</span></td>
                            <td>The parrot</td>
                            <td><span lang="es">Cotorro cotorro saca la pata, y empiesa a platicar.</span></td>
                            <td>Parrot parrot, stick out your claw and begin to chat with me.</td>
                        </tr>
                        <tr>
                            <td>25</td>
                            <td><span lang="es">El boracho</span></td>
                            <td>The drunkard</td>
                            <td><span lang="es">A que borracho tan necio ya no lo puedo aguanatar</span></td>
                            <td>Oh what an annoying drunk, I can't stand him any more.</td>
                        </tr>
                        <tr>
                            <td>26</td>
                            <td><span lang="es">El negrito</span></td>
                            <td>The little black man</td>
                            <td><span lang="es">El que se comio el azucar.</span></td>
                            <td>The one that ate the sugar.</td>
                        </tr>
                        <tr>
                            <td>27</td>
                            <td><span lang="es">El Coracon</span></td>
                            <td>The heart</td>
                            <td><span lang="es">No me extranes corazon, que regreso en el camion</span></td>
                            <td>Do not miss me, sweatheart, I'll be back by bus.</td>
                        </tr>
                        <tr>
                            <td>28</td>
                            <td><span lang="es">La sandia</span></td>
                            <td>The watermelon</td>
                            <td><span lang="es">La barriga que Juan tenia, era empache de sandia.</span></td>
                            <td>The swollen belly that Juan had, was from eating too much watermelon.</td>
                        </tr>
                        <tr>
                            <td>29</td>
                            <td><span lang="es">El tambor</span></td>
                            <td>The drum</td>
                            <td><span lang="es">No te arrugues, cuero viejo, que te quiro pa tabor.</span></td>
                            <td>Don't wrinkle, dear old leather, since I want you for a drum.</td>
                        </tr>
                        <tr>
                            <td>30</td>
                            <td><span lang="es">El camaron</span></td>
                            <td>The shrimp</td>
                            <td><span lang="es">Camaron que se duerme, se lo lleva la corriente.</span></td>
                            <td>The shrimp that slumbers is taken by the tides.</td>
                        </tr>
                        <tr>
                            <td>31</td>
                            <td><span lang="es">Las jaras</span></td>
                            <td>The arrows</td>
                            <td><span lang="es">Las jaras del indio Adan, donde pegan dan.</span></td>
                            <td>The arrows of Adam the Indian, strike where they hit.</td>
                        </tr>
                        <tr>
                            <td>32</td>
                            <td><span lang="es">El musico</span></td>
                            <td>The musician</td>
                            <td><span lang="es">El musico trompas de hule, ya no me quire tocar.</span></td>
                            <td>The rubber lipped musician does not want to play for me anymore.</td>
                        </tr>
                        <tr>
                            <td>33</td>
                            <td><span lang="es">La arana</span></td>
                            <td>The spider</td>
                            <td><span lang="es">Aterantamela a palos, ne me la dejes llegar.</span></td>
                            <td>Beat it silly with a stick, do not let it near me.</td>
                        </tr>
                        <tr>
                            <td>34</td>
                            <td><span lang="es">El soldado</span></td>
                            <td>The soldier</td>
                            <td><span lang="es">Uno, dos y tres, el soldado pa'l cuartel.</span></td>
                            <td>One,two, three, the soldier heads to the fort.</td>
                        </tr>
                        <tr>
                            <td>35</td>
                            <td><span lang="es">La estrella</span></td>
                            <td>The star</td>
                            <td><span lang="es">La guia de los marineros</span></td>
                            <td>Sailor's guide.</td>
                        </tr>
                        <tr>
                            <td>36</td>
                            <td><span lang="es">El Cazo</span></td>
                            <td>The saucepan</td>
                            <td><span lang="es">El caso que hago es poco.</span></td>
                            <td>The attention I pay you is little. (A pun: <span lang="es"></span> "attention" and <span lang="es">cazo</span> "saucepan" are homohpones in Mexican Spanish.)</td>                      
                        </tr>
                        <tr>
                            <td>37</td>
                            <td><span lang="es">El mundo</span></td>
                            <td>The world</td>
                            <td><span lang="es">Este mundo es una bola, y nosotros un bolon</span></td>
                            <td>This world  is a ball, we are great mob (A pun: <span lang="es">bola</span> can mean both "ball, shpere" and "crowd, mob" <span lang="es">bolon</span> is a superlative in Mexican Spanish)</td>
                        </tr>
                        <tr>
                            <td>38</td>
                            <td><span lang="es">El apache</span></td>
                            <td>The Apache</td>
                            <td><span lang="es">Ah, Chihuahua! Cuanto apache con pantalon y huarache.</span></td>
                            <td>Ah Chihuahua! So many Apaches with pants and sandals.</td>
                        </tr>
                        <tr>
                            <td>39</td>
                            <td><span lang="es">El nopal</span></td>
                            <td>The prickly pear cactus</td>
                            <td><span lang="es">Al nopal lo van a ver nomas cuando tiene  tunas.</span></td>
                            <td>People go to see the prickly pear, only when it bears fruit.</td>
                        </tr>
                        <tr>
                            <td>40</td>
                            <td><span lang="es">El aracran</span></td>
                            <td>The scorpian</td>
                            <td><span lang="es">El que con la cola pica, le dan una paliza.</span></td>
                            <td>He who stings with his tail, will get a beating.</td>
                        </tr>
                        <tr>
                            <td>41</td>
                            <td><span lang="es">La rosa</span></td>
                            <td>The rose</td>
                            <td><span lang="es">Rosita, Rosaura, ven que to quiero ahora</span></td>
                            <td>Rosita, Rosaura, come, as I want you here now.</td>
                        </tr>
                        <tr>
                            <td>42</td>
                            <td><span lang="es">La calavera</span></td>
                            <td>The skull</td>
                            <td><span lang="es">Al pasar por el panteon, me encontre un calaveron.</span></td>
                            <td>As I passed by the cemetary, I came across a skull.</td>
                        </tr>
                        <tr>
                            <td>43</td>
                            <td><span lang="es">La campana</span></td>
                            <td>The bell</td>
                            <td><span lang="es">Tu con la campana y yo con tu hermana.</span></td>
                            <td>You with the bell and I with your sister.</td>
                        </tr>
                        <tr>
                            <td>44</td>
                            <td><span lang="es">El cantarito</span></td>
                            <td>The little water pitcher.</td>
                            <td><span lang="es">Tanto va el canaro al agua, que se quiebra y te moja las enaguas.</span></td>
                            <td>So often does the jug to to the water, that it breaks and wets your slip.</td>
                        </tr>
                        <tr>
                            <td>45</td>
                            <td><span lang="es">El Venado</span></td>
                            <td>The dear</td>
                            <td><span lang="es">Saltando ve buscando pero noive nada.</span></td>
                            <td>Jumping it goes searching, but it doesnt see anything. (A pun: <span lang="es">venado</span> "dear" sounds like <span lang="es">ve nada</span> "see nothing")</td>
                        </tr>
                        <tr>
                            <td>46</td>     
                            <td><span lang="es">El sol</span></td>
                            <td>The sun</td>
                            <td><span lang="es">La cobija de los pobres.</span></td>
                            <td>The blanket of the poor.</td>
                        </tr>
                        <tr>
                            <td>47</td>
                            <td><span lang="es">La corona</span></td>
                            <td>The crown</td>
                            <td><span lang="es">El sombrero de los reyes.</span></td>
                            <td>The hat of kings</td>
                        </tr>
                        <tr>
                            <td>48</td>
                            <td><span lang="es">La chalupa</span></td>
                            <td>The conoe</td>
                            <td><span lang="es">Rema que rema Lupita, sentada en su chalupita</span></td>
                            <td>Lupita rows as she may, sitting in her little boat.</td>
                        </tr>
                        <tr>
                            <td>49</td>
                            <td><span lang="es">El pino</span></td>
                            <td>The pine tree</td>
                            <td><span lang="es">Fresco y oloroso, en todo tiempo hermoso.</span></td>
                            <td>Fresh and fragrant, beautiful in any season.</td>
                        </tr>
                        <tr>
                            <td>50</td>
                            <td><span lang="es">El pescado</span></td>
                            <td>The fish</td>
                            <td><span lang="es">El que por la boca muere, aunque mundo fuere.</span></td>
                            <td>The one who dies by the mouth, even if he were nute. (in reference to a fish being hooked y its mouth, even though it doesn't utter a sound.)</td>
                        </tr>
                        <tr>
                            <td>51</td>
                            <td><span lang="es">La palma</span></td>
                            <td>The palm tree</td>
                            <td><span lang="es">Palmero, sube a la palma y bajame un coco real.</span></td>
                            <td>Plamer, climb the palm tree and bring me a coconut fit for kings. (Lit: "A royal coconut")</td>
                        </tr>
                        <tr>
                            <td>52</td>
                            <td><span lang="es">La maceta</span></td>
                            <td>The flowerpot</td>
                            <td><span lang="es">El que nace pa'maceta, no sale del corredor.</span></td>
                            <td>He who is born to be a flowerpot, does not go beyond the hallway.</td>
                        </tr>
                        <tr>
                            <td>53</td>
                            <td><span lang="es">El arpa</span></td>
                            <td>The harp</td>
                            <td><span lang="es">Arpa vieja de mi suegra, ya no sirves pa'tocar.</span></td>
                            <td>Old harp of my mother-in-law, you are no longer fit to play.</td>
                        </tr>
                        <tr>
                            <td>54</td>
                            <td><span lang="es">La rana</span></td>
                            <td>The frog</td>
                            <td><span lang="es">Al ver a la verde rana, que brinco pego tu hermana.</span></td>
                            <td>What a jump your sister gave, as she saw the green frog.</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}