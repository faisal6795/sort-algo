import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HeapSort, QuickSort, BubbleSort, SelectionSort } from './algorithm';

const defaultColor = '#febc0a';
const activeColor = '#bc8a01';
const completeColor = '#35c500';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	public sortingData = [];
	public currentAlgo = 0;
	public isPlaying = false;
	public isDone = false;

	constructor(private ref: ChangeDetectorRef) {
		document.documentElement.style.setProperty('--full-height', window.innerHeight + 'px');
		this.initialize(10);
	}

	onSliderChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		this.initialize(+target.value);
	}

	selectAlgo(event: MouseEvent, index: number) {
		const target = event.target as HTMLElement;
		Array.from(target.parentElement.children).forEach(item => { item.classList.remove('selected') });
		target.classList.add('selected');
		this.currentAlgo = index;
	}

	initialize(size: number): void {
		const min = 10, max = 100;
		this.sortingData.length = 0;
		while (this.sortingData.length < (size * 4 + 4)) {
			const height = Math.ceil(Math.random() * (max - min)) + min;
			if (this.sortingData.every(item => item.height !== height)) this.sortingData.push({ height, color: defaultColor });
		}
	}

	getGap() {
		return (6 - Math.round(this.sortingData.length / 20) + 'px');
	}

	playBtnClick() {
		if (this.isDone) {
			this.isDone = false;
			this.initialize((this.sortingData.length - 4) / 4);
		} else this.sortArray();
	}

	sortArray() {
		let indexData = [];
		switch (this.currentAlgo) {
			case 0: indexData = HeapSort(this.sortingData);
				break;
			case 1: indexData = QuickSort(this.sortingData);
				break;
			case 2: indexData = BubbleSort(this.sortingData);
				break;
			case 3: indexData = SelectionSort(this.sortingData);
		}
		this.updateData(indexData);
	}

	async updateData(indexData: number[][]) {
		const interval = 207 - Math.round(this.sortingData.length * 151 / 81),
			pause = (interval: number) => new Promise(resolve => setTimeout(resolve, interval));
		this.isPlaying = true;
		indexData.forEach((item: number[], index: number) => {
			setTimeout(async () => {
				this.sortingData[item[0]].color = activeColor;
				this.sortingData[item[1]].color = activeColor;
				[this.sortingData[item[0]].height, this.sortingData[item[1]].height] =
					[this.sortingData[item[1]].height, this.sortingData[item[0]].height];

				await pause(interval);
				this.sortingData[item[0]].color = defaultColor;
				this.sortingData[item[1]].color = defaultColor;
				this.ref.detectChanges();
			}, index * interval);
		});

		await pause((indexData.length + 1) * interval);
		this.sortingData.map(item => item.color = completeColor);
		this.isPlaying = false;
		this.isDone = true;
		this.ref.detectChanges();
	}
}