import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { CharacterService } from '../../services/character-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list',
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterListComponent {
  public characterService = inject(CharacterService);
  public error = this.characterService.error;

  showGetCharactersError = effect(() => {
    const errorMsg = this.error();
    if (errorMsg) {
      console.log(errorMsg);
    }
  });

}
