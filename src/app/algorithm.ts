function swap(arr: number[], indexA: number, indexB: number, indexArray: number[][]) {
	indexArray.push([indexA, indexB]);
	[arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

export function HeapSort(data: any): number[][] {
	let arr = data.map(item => item.height).slice(), arrLength = arr.length, indexArray = [];

	function maxHeap(arr: number[], index: number) {
		const left = 2 * index + 1, right = 2 * index + 2;
		let max = index;

		(left < arrLength && arr[left] > arr[max]) && (max = left);
		(right < arrLength && arr[right] > arr[max]) && (max = right);

		if (max != index) {
			swap(arr, index, max, indexArray);
			maxHeap(arr, max);
		}
	}

	for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1) maxHeap(arr, i);

	for (let i = arr.length - 1; i > 0; i--) {
		swap(arr, 0, i, indexArray);
		arrLength--;
		maxHeap(arr, 0);
	}
	return indexArray;
}

export function QuickSort(data: any): number[][] {
	let arr = data.map(item => item.height).slice(), indexArray = [];

	function partition(arr: number[], left: number, right: number): number {
		const pivot = arr[Math.floor((right + left) / 2)];
		let i = left, j = right;

		while (i <= j) {
			while (arr[i] < pivot) i++;
			while (arr[j] > pivot) j--;
			if (i <= j) {
				swap(arr, i, j, indexArray);
				i++;
				j--;
			}
		}
		return i;
	}

	function quick(arr: number[], left: number, right: number) {
		let index: number;
		if (arr.length > 1) {
			index = partition(arr, left, right);
			if (left < index - 1) quick(arr, left, index - 1);
			if (index < right) quick(arr, index, right);
		}
		return arr;
	}
	quick(arr, 0, arr.length - 1);
	return indexArray;
}

export function SelectionSort(data: any): number[][] {
	let arr = data.map(item => item.height).slice(), indexArray = [];

	for (let i = 0; i < arr.length; i++) {
		let min = i;
		for (let j = i + 1; j < arr.length; j++)
			if (arr[j] < arr[min]) min = j;
		if (min != i) swap(arr, min, i, indexArray);
	}
	return indexArray;
}

export function BubbleSort(data: any): number[][] {
	let arr = data.map(item => item.height).slice(), indexArray = [];

	for (let i = 0; i < arr.length; i++)
		for (let j = 0; j < (arr.length - i); j++)
			if (arr[j] > arr[j + 1]) swap(arr, j, j + 1, indexArray);

	return indexArray;
}