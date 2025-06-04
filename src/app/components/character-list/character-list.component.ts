import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character-service.service';

@Component({
  selector: 'app-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterListComponent implements OnInit {
  private characterService = inject(CharacterService);

  ngOnInit(): void {
    console.log('ngOnInit');

    console.log(this.characterService.loading());

  }

}
