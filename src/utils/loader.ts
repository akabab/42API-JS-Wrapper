export class Loader {
  private readonly _bar: string[]
  private readonly _size: number

  constructor (size: number) {
    this._bar = new Array(size)
    this._size = size
  }

  start (): void {
    process.stdout.write('\r\x1B[?25l')
  }

  step (msg: string, index: number, limit: number): void {
    this._bar.fill('▓', 0, (index * this._size) / limit)
    this._bar.fill('░', index, this._size)
    if (index === limit) this._bar.fill('▓')
    process.stdout.write(
    `\r${msg} ${this._bar.join('')} ${Math.floor(
      (index * 100) / limit
    )}% | ${index}/${limit}`
    )
  }

  end (): void {
    process.stdout.write('\r\x1B[?25h\n')
  }
}
